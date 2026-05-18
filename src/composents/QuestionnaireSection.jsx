import { useState } from 'react';

export default function QuestionnaireSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [niveau, setNiveau] = useState('');
  const [notesLycee, setNotesLycee] = useState({
    maths: '', francais: '', anglais: '', physique: '', svt: '', histoire: '', philosophie: ''
  });
  const [infoBac, setInfoBac] = useState({
    ecole: '', filiere: '', moyenne: '', annee: ''
  });
  const [showNiveauForm, setShowNiveauForm] = useState(false);
  const [niveauValide, setNiveauValide] = useState(false);
  const [resultat, setResultat] = useState('');
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 0,
      question: "Quel est ton niveau d'études actuel ?",
      options: ['Lycée', 'Bac+1/2', 'Bac+3', 'Bac+4/5'],
    },
    {
      id: 1,
      question: "Quel domaine t'intéresse le plus ?",
      options: ['Sciences et Ingénierie', 'Commerce et Gestion', 'Médecine et Santé', 'Arts et Lettres'],
    },
    {
      id: 2,
      question: 'Quelle ville préfères-tu pour tes études ?',
      options: ['Casablanca', 'Rabat', 'Marrakech', 'Fès', 'Autre'],
    },
    {
      id: 3,
      question: "Quel type d'enseignement préfères-tu ?",
      options: ['Public', 'Privé', 'Pas de préférence'],
    },
  ];

  const handleAnswer = (answer) => {
    // Question niveau (step 0)
    if (currentStep === 0) {
      setNiveau(answer);
      setAnswers({ ...answers, [currentStep]: answer });
      setShowNiveauForm(true);
      return;
    }
    setAnswers({ ...answers, [currentStep]: answer });
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleNiveauSubmit = () => {
    setNiveauValide(true);
    setShowNiveauForm(false);
    setCurrentStep(1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    else if (currentStep === 1) {
      setCurrentStep(0);
      setNiveauValide(false);
      setShowNiveauForm(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResultat('');
    setNiveau('');
    setNiveauValide(false);
    setShowNiveauForm(false);
    setNotesLycee({ maths: '', francais: '', anglais: '', physique: '', svt: '', histoire: '', philosophie: '' });
    setInfoBac({ ecole: '', filiere: '', moyenne: '', annee: '' });
  };

  const analyserAvecIA = async () => {
    setLoading(true);
    setResultat('');

    const resumeReponses = questions.map((q, idx) =>
      `${q.question} → ${answers[idx]}`
    ).join('\n');

    const resumeNiveau = niveau === 'Lycée'
      ? `Notes lycée: Maths:${notesLycee.maths}/20, Français:${notesLycee.francais}/20, Anglais:${notesLycee.anglais}/20, Physique:${notesLycee.physique}/20, SVT:${notesLycee.svt}/20, Histoire:${notesLycee.histoire}/20, Philosophie:${notesLycee.philosophie}/20`
      : `École actuelle: ${infoBac.ecole}, Filière: ${infoBac.filiere}, Moyenne: ${infoBac.moyenne}/20, Année diplôme: ${infoBac.annee}`;

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Tu es un conseiller d'orientation scolaire au Maroc.
En fonction de ces informations d'un étudiant :

${resumeNiveau}
${resumeReponses}

Recommande 2 à 3 écoles ou filières adaptées au Maroc avec une courte explication pour chacune.
Sois précis, encourageant et concis.`
              }]
            }]
          }),
        }
      );

      const data = await res.json();
      if (data.error) {
        setResultat(`Erreur API: ${data.error.message}`);
        return;
      }
      setResultat(data.candidates[0].content.parts[0].text);
    } catch (err) {
      setResultat("Une erreur s'est produite. Vérifie ta clé API.");
    }

    setLoading(false);
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const isFinished = Object.keys(answers).length === questions.length;

  // ✅ Formulaire Lycée
  const FormLycee = () => (
    <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl required">
      <h4 className="font-semibold text-blue-900 mb-4">📝 Entre tes notes (sur 20) :</h4>
      <div className="grid grid-cols-2 gap-4 required">
        {[
          { key: 'maths', label: 'Mathématiques' },
          { key: 'francais', label: 'Français' },
          { key: 'anglais', label: 'Anglais' },
          { key: 'physique', label: 'Physique-Chimie' },
          { key: 'svt', label: 'SVT' },
          { key: 'histoire', label: 'Histoire-Géo' },
          { key: 'philosophie', label: 'Philosophie' },
        ].map(({ key, label }) => (
          <div key={key}>
            <label className="text-sm text-gray-600 mb-1 block">{label}</label>
            <input
              type="number"
              min="0"
              max="20"
              placeholder="0-20"
              value={notesLycee[key]}
              onChange={(e) => setNotesLycee({ ...notesLycee, [key]: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 outline-none"
              required
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleNiveauSubmit}
        className="mt-6 w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
      >
        Continuer →
      </button>
    </div>
  );

  // ✅ Formulaire Bac+
  const FormBac = () => (
    <div className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl required">
      <h4 className="font-semibold text-blue-900 mb-4">📝 Infos sur tes études actuelles :</h4>
      <div className="space-y-4 required">
        {[
          { key: 'ecole', label: "Nom de l'école / université", placeholder: "Ex: ENCG Casablanca" },
          { key: 'filiere', label: 'Filière actuelle', placeholder: 'Ex: Génie Informatique' },
          { key: 'moyenne', label: 'Moyenne générale (sur 20)', placeholder: 'Ex: 14.5' },
          { key: 'annee', label: "Année d'obtention du diplôme", placeholder: 'Ex: 2025' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-sm text-gray-600 mb-1 block">{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              value={infoBac[key]}
              onChange={(e) => setInfoBac({ ...infoBac, [key]: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-blue-400 outline-none"
              required
            />
          </div>
        ))}
      </div>
      <button
        onClick={handleNiveauSubmit}
        className="mt-6 w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors"
      >
        Continuer →
      </button>
    </div>
  );

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">
            Questionnaire d'Orientation
          </h2>
          <p className="text-xl text-gray-600">
            Réponds à quelques questions pour trouver la formation idéale
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentStep + 1} sur {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-blue-900 mb-6">
              {questions[currentStep].question}
            </h3>
            <div className="space-y-3">
              {questions[currentStep].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    answers[currentStep] === option
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <span className="font-medium">{option}</span>
                </button>
              ))}
            </div>

            {/* ✅ Formulaire dynamique selon niveau */}
            {showNiveauForm && niveau === 'Lycée' && <FormLycee />}
            {showNiveauForm && niveau !== 'Lycée' && <FormBac />}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="px-6 py-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            {currentStep === questions.length - 1 && answers[currentStep] && (
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Recommencer
              </button>
            )}
          </div>
        </div>

        {/* Résumé + IA */}
        {isFinished && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="font-semibold text-blue-900 mb-3">Tes réponses :</h4>
            <div className="space-y-2 mb-6">
              {questions.map((q, idx) => (
                <div key={q.id} className="text-sm">
                  <span className="text-gray-600">{q.question}</span>
                  <span className="ml-2 font-medium text-blue-700">{answers[idx]}</span>
                </div>
              ))}
            </div>

            <button
              onClick={analyserAvecIA}
              disabled={loading}
              className="w-full py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? '🤖 Analyse en cours...' : '🎓 Voir mes recommandations IA'}
            </button>

            {resultat && (
              <div className="mt-6 p-5 bg-white border border-emerald-200 rounded-xl">
                <h4 className="font-bold text-emerald-700 mb-3">🎯 Recommandations :</h4>
                <p className="text-gray-700 whitespace-pre-line">{resultat}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}