import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">SR</span>
            </div>
            <span className="font-semibold text-gray-900 text-lg">StrataReady</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 hidden md:block">How it works</a>
            <a href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 hidden md:block">Pricing</a>
            <Link href="/login" className="text-sm text-gray-700 hover:text-gray-900">Sign in</Link>
            <Link href="/demo" className="bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Try free demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          BC Strata Management Licensing Exam Prep
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-3xl mx-auto">
          Find out if you&apos;re ready.<br />
          If not, know exactly what to study.
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Practice exams built from the official UBC Sauder course materials. 
          Instant results. Exact page references and Act citations for every wrong answer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/demo"
            className="bg-blue-700 text-white text-lg font-medium px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors"
          >
            Try 10 free questions →
          </Link>
          <a
            href="#how-it-works"
            className="border border-gray-200 text-gray-700 text-lg font-medium px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors"
          >
            See how it works
          </a>
        </div>
        <p className="text-sm text-gray-400 mt-6">No account required for the free demo</p>
      </section>

      {/* Social proof bar */}
      <section className="border-y border-gray-100 bg-gray-50 py-6">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">105</p>
              <p className="text-sm text-gray-500">questions per exam</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">21</p>
              <p className="text-sm text-gray-500">course sections covered</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">70%</p>
              <p className="text-sm text-gray-500">passing grade required</p>
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200"></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">UBC</p>
              <p className="text-sm text-gray-500">official course materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How StrataReady works</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            The fastest way to know you&apos;re ready for the UBC Sauder licensing exam.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Take a practice exam',
              desc: 'Answer 105 multiple choice questions that mirror the real UBC exam format. Questions are drawn from all 21 course sections.',
            },
            {
              step: '02',
              title: 'Get instant results',
              desc: 'See your score immediately. Every wrong answer shows you exactly why — with the correct answer and a full explanation.',
            },
            {
              step: '03',
              title: 'Know exactly what to study',
              desc: 'Receive a personalised study plan with exact page numbers, chapter references, and Act citations for everything you missed.',
            },
          ].map(item => (
            <div key={item.step} className="bg-gray-50 rounded-2xl p-8">
              <div className="text-blue-600 font-bold text-sm mb-4">{item.step}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature highlight */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Not just a score — a precise study plan
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                Most practice tests tell you what you got wrong. StrataReady tells you 
                exactly where to find the right answer — down to the page number and 
                the specific section of the Strata Property Act.
              </p>
              <ul className="space-y-4">
                {[
                  'Exact textbook page references for every missed question',
                  'Specific Act and regulation citations (BCSPA, RESA, PIPA)',
                  'Section-by-section performance breakdown',
                  'Retake with a fresh set of questions each time',
                  'Questions written from the official UBC course materials only',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-500">Study guide — after your exam</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">3 areas to review</span>
              </div>
              <div className="space-y-4">
                {[
                  {
                    topic: 'Strata Property Act — Governance',
                    ref: 'BCSPA s.26–s.35',
                    pages: 'Chapter 10, pp. 188–204',
                    score: '40%',
                    color: 'red',
                  },
                  {
                    topic: 'Operating Budget Fundamentals',
                    ref: 'Chapter 19',
                    pages: 'pp. 312–328',
                    score: '60%',
                    color: 'amber',
                  },
                  {
                    topic: 'Strata Meetings & Communications',
                    ref: 'BCSPA s.40–s.48',
                    pages: 'Chapter 12, pp. 220–236',
                    score: '55%',
                    color: 'amber',
                  },
                ].map(item => (
                  <div key={item.topic} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.topic}</span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.color === 'red' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>{item.score}</span>
                    </div>
                    <p className="text-xs text-blue-600 font-medium">{item.ref}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.pages}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-5xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple pricing</h2>
          <p className="text-gray-500 text-lg">
            You have two attempts at the real exam. Make them count.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">

          {/* Free */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="font-semibold text-gray-900 mb-1">Free demo</h3>
            <p className="text-gray-400 text-sm mb-6">See what StrataReady can do</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-900">$0</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-gray-600">
              {['10 sample questions','Instant score','Basic study references','No account needed'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/demo" className="block text-center border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Try free demo
            </Link>
          </div>

          {/* Per exam */}
          <div className="border-2 border-blue-700 rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-full">
              Most popular
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Per exam</h3>
            <p className="text-gray-400 text-sm mb-6">Pay as you go</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-900">$9.99</span>
              <span className="text-gray-400 text-sm ml-1">/ attempt</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-gray-600">
              {['105 questions','Instant results','Full study guide','Exact page & Act references','Section performance breakdown'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="block text-center bg-blue-700 text-white font-medium py-3 rounded-xl hover:bg-blue-800 transition-colors">
              Get started
            </Link>
          </div>

          {/* Unlimited */}
          <div className="border border-gray-200 rounded-2xl p-8">
            <h3 className="font-semibold text-gray-900 mb-1">Unlimited</h3>
            <p className="text-gray-400 text-sm mb-6">Best value for serious prep</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-900">$49.99</span>
              <span className="text-gray-400 text-sm ml-1">one-time</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-gray-600">
              {['Unlimited exam attempts','Everything in Per exam','Progress tracking','Score trend over time','Exam readiness score'].map(f => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/signup?plan=unlimited" className="block text-center border border-gray-200 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-50 transition-colors">
              Get unlimited
            </Link>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to find out if you&apos;re exam-ready?
          </h2>
          <p className="text-blue-200 text-lg mb-8">
            Try 10 free questions right now. No account, no credit card.
          </p>
          <Link
            href="/demo"
            className="inline-block bg-white text-blue-700 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Start free demo →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">SR</span>
            </div>
            <span className="text-sm font-medium text-gray-700">StrataReady</span>
          </div>
          <p className="text-sm text-gray-400 text-center">
            BC Strata Management Licensing Exam Preparation. Not affiliated with UBC Sauder School of Business.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-gray-600">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-600">Terms</Link>
          </div>
        </div>
      </footer>

    </main>
  )
}
