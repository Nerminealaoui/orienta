import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const words = ['Écoles', 'Formations', 'Carrières', 'Opportunités', 'Métiers'];

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setTypedText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        
        if (charIndex === 0) {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      } else {
        setTypedText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        
        if (charIndex === currentWord.length) {
          setIsDeleting(true);
          setTimeout(() => {}, 1000);
        }
      }
    };

    const timer = setTimeout(handleTyping, 100);
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, wordIndex]);

  const testimonials = [
    { name: "Fatima Zahra", role: "Étudiante à l'ENSA", text: "Grâce à OrientaMaroc, j'ai trouvé la filière parfaite pour mes compétences !", rating: 5 },
    { name: "Youssef Amrani", role: "Diplômé de l'ENCG", text: "Une plateforme innovante qui m'a vraiment aidé dans mon orientation.", rating: 5 },
    { name: "Leila Benali", role: "Étudiante en Master", text: "L'IA m'a suggéré des formations que je n'aurais jamais envisagées !", rating: 5 }
  ];

  const features = [
    { icon: "🎯", title: "Orientation personnalisée", desc: "Basée sur tes compétences et passions" },
    { icon: "🤖", title: "IA intelligente", desc: "Recommandations précises et adaptées" },
    { icon: "📊", title: "Statistiques en temps réel", desc: "Débouchés et taux d'insertion" },
    { icon: "🎓", title: "+500 écoles partenaires", desc: "Les meilleures institutions marocaines" },
    { icon: "💼", title: "Opportunités de stage", desc: "Mise en relation avec des entreprises" },
    { icon: "🚀", title: "Accompagnement continu", desc: "Suivi personnalisé tout au long" }
  ];

  const faqs = [
    { q: "Comment fonctionne l'orientation par IA ?", a: "Notre IA analyse votre profil, vos centres d'intérêt et vos compétences pour vous recommander les formations les plus adaptées." },
    { q: "Est-ce que la plateforme est gratuite ?", a: "Oui, l'inscription et l'utilisation de base sont totalement gratuites pour tous les étudiants." },
    { q: "Quelles écoles sont référencées ?", a: "Plus de 500 écoles marocaines, publiques et privées, sont présentes dans notre annuaire." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-400 rounded-full opacity-20 animate-float"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-28">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-semibold text-blue-800">✨ Nouvelle expérience d'orientation</span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight animate-fade-in-up">
              <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-emerald-600 bg-clip-text text-transparent">
                Trouve ton avenir
              </span>
              <br />
              <span className="relative inline-block mt-2">
                avec l'IA
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full"></div>
              </span>
            </h1>

            {/* Animated subtitle */}
            <div className="text-xl md:text-2xl text-gray-600 mb-6 h-12 animate-fade-in-up animation-delay-200">
              Découvre les meilleures{' '}
              <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">
                {typedText}
              </span>
              <span className="animate-blink">|</span>
            </div>

            {/* Description */}
            <div className="relative mb-12 animate-fade-in-up animation-delay-300">
              <div className="relative inline-block max-w-3xl mx-auto">
                <div className="flex justify-center mb-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full p-2">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed relative z-10 px-4">
                  <span className="font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    au Maroc
                  </span>
                  <span className="mx-2 text-emerald-500">✦</span>
                  grâce à notre plateforme d'orientation intelligente
                  <br className="hidden sm:block" />
                  <span className="inline-flex items-center gap-2 mt-2">
                    <span className="w-8 h-px bg-gradient-to-r from-transparent to-emerald-400"></span>
                    <span className="relative">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 blur-md opacity-50"></span>
                      <span className="relative font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text animate-gradient">
                        basée sur l'IA
                      </span>
                    </span>
                    <span className="w-8 h-px bg-gradient-to-l from-transparent to-emerald-400"></span>
                  </span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up animation-delay-400">
              <Link to="/questionnaire" className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="relative z-10 flex items-center gap-2">
                  Commencer mon orientation
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
              <Link to="/annuaire" className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-all transform hover:scale-105 shadow-sm">
                Explorer les formations
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-500">
              <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 group-hover:scale-110 transition-transform">
                  500<span className="text-sm">+</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">Écoles</div>
                <p className="text-gray-500 text-sm">Partenariats exclusifs</p>
              </div>

              <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 group-hover:scale-110 transition-transform">
                  100<span className="text-sm">+</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">Formations</div>
                <p className="text-gray-500 text-sm">Programmes diversifiés</p>
              </div>

              <div className="group bg-white/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3 group-hover:scale-110 transition-transform">
                  20k<span className="text-sm">+</span>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">Étudiants</div>
                <p className="text-gray-500 text-sm">Guidés vers la réussite</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pourquoi nous choisir ?</h2>
            <p className="text-lg text-gray-600">Une plateforme complète pour réussir ton orientation</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-8 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-xl">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ce qu'en disent nos étudiants</h2>
            <p className="text-lg text-gray-600">Des parcours transformés grâce à OrientaMaroc</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Comment ça marche ?</h2>
            <p className="text-lg text-gray-600">3 étapes simples vers ton avenir</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Réponds au questionnaire</h3>
              <p className="text-gray-600">Décris tes centres d'intérêt, compétences et objectifs</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Analyse par l'IA</h3>
              <p className="text-gray-600">Notre IA analyse ton profil en profondeur</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Recommandations</h3>
              <p className="text-gray-600">Reçois une liste personnalisée de formations</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Foire aux questions</h2>
            <p className="text-lg text-gray-600">Tout ce que tu dois savoir</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="bg-white rounded-xl shadow-md group">
                <summary className="cursor-pointer p-6 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {faq.q}
                </summary>
                <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ne manque aucune actualité</h2>
          <p className="text-lg text-blue-100 mb-8">Reçois les dernières informations sur les formations et les opportunités</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Ton adresse email" className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white" />
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              S'abonner
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">OrientaMaroc</h3>
              <p className="text-gray-400">La meilleure plateforme d'orientation intelligente au Maroc</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens rapides</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
                <li><Link to="/annuaire" className="hover:text-white transition">Annuaire</Link></li>
                <li><Link to="/questionnaire" className="hover:text-white transition">IA</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 contact@orientamaroc.ma</li>
                <li>📞 +212 5 22 123 456</li>
                <li>📍 Casablanca, Maroc</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suis-nous</h4>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition">📘 Facebook</a>
                <a href="#" className="text-gray-400 hover:text-white transition">📸 Instagram</a>
                <a href="#" className="text-gray-400 hover:text-white transition">💼 LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 OrientaMaroc. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Scroll indicator */}
      <div className="fixed bottom-8 right-8 animate-bounce">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white shadow-lg">
          ↓
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-blob { animation: blob 7s infinite; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .animate-blink { animation: blink 1s step-end infinite; }
        .animate-float { animation: float linear infinite; }
        .animate-gradient { background-size: 200% auto; animation: gradient 3s linear infinite; }
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}