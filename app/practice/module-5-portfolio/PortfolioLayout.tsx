'use client'

import { type FC, useEffect, useState } from 'react'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

const ProjectCard: FC<ProjectCardProps> = ({ title, description, image, link, tags }) => {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-2 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900">
      <div className="h-40 bg-slate-100">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex text-sm font-semibold text-blue-600 transition hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View project →
        </a>
      </div>
    </article>
  )
}

export const PortfolioLayout: FC = (): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme === 'dark' || (!savedTheme && prefersDark)

    setIsDarkMode(initialTheme)
    document.documentElement.classList.toggle('dark', initialTheme)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const validateField = (name: string, value: string): string => {
    if (!value.trim()) return 'This field is required.'

    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      return isValidEmail ? '' : 'Please enter a valid email address.'
    }

    if (name === 'message' && value.trim().length < 10) {
      return 'Please enter at least 10 characters.'
    }

    return ''
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    setSubmitted(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message),
    }

    setErrors(nextErrors)

    const isValid = !nextErrors.name && !nextErrors.email && !nextErrors.message

    if (isValid) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    }
  }

  const isFormValid =
    !validateField('name', formData.name) &&
    !validateField('email', formData.email) &&
    !validateField('message', formData.message)

  const projects: ProjectCardProps[] = [
    {
      title: 'AI Writing Assistant',
      description:
        'A polished writing tool that helps teams draft, review, and publish content faster.',
      image:
        'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
      link: 'https://example.com/ai-writing-assistant',
      tags: ['Next.js', 'Tailwind', 'AI'],
    },
    {
      title: 'Design System Toolkit',
      description:
        'A reusable component library for building consistent product experiences across teams.',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
      link: 'https://example.com/design-system-toolkit',
      tags: ['TypeScript', 'Storybook', 'UI'],
    },
    {
      title: 'Analytics Dashboard',
      description:
        'A clear and fast dashboard for surfacing product performance insights for founders.',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      link: 'https://example.com/analytics-dashboard',
      tags: ['React', 'Charts', 'Dashboard'],
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 lg:px-8">
          <a href="#" className="text-lg font-semibold tracking-tight">
            Eric Reeves
          </a>
          <div className="flex items-center gap-4">
            <nav className="flex gap-6 text-sm text-slate-600 dark:text-slate-300">
              <a href="#projects" className="transition hover:text-slate-900 dark:hover:text-white">
                Projects
              </a>
              <a href="#about" className="transition hover:text-slate-900 dark:hover:text-white">
                About
              </a>
              <a href="#contact" className="transition hover:text-slate-900 dark:hover:text-white">
                Contact
              </a>
            </nav>
            <button
              type="button"
              onClick={() => setIsDarkMode(prev => !prev)}
              className="rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 opacity-0 animate-[fadeIn_0.8s_ease-out_forwards] lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Product Designer & Frontend Developer
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Hi, I&apos;m Eric Reeves — I turn ideas into elegant web experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
              I build thoughtful interfaces, polished product experiences, and fast-moving digital
              products that feel clear and human.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:ericreeves@example.com"
                className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300"
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                View projects
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="h-40 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500" />
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Currently available for freelance work
            </p>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              I help startups and teams shape thoughtful, high-converting product experiences.
            </p>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl px-6 py-8 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                Selected work
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">Projects</h2>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map(project => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section id="about" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
            <div className="flex justify-center lg:justify-start">
              <div className="flex h-48 w-48 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-gradient-to-br from-blue-500 to-violet-500 text-4xl font-semibold text-white">
                ER
              </div>
            </div>

            <div className="text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                About me
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                Creative developer with a product mindset
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 lg:mx-0">
                I’m a multidisciplinary designer and developer focused on building experiences that
                are beautiful, accessible, and easy to use. I enjoy turning complex problems into
                clear interfaces and thoughtful product stories.
              </p>
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                  Skills
                </h3>
                <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                  {['UI Design', 'React', 'Next.js', 'Tailwind CSS', 'Accessibility', 'Figma'].map(skill => (
                    <span
                      key={skill}
                      className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
                Contact
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-slate-100">
                Let&apos;s build something great together
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600 dark:text-slate-400">
                Have a project in mind or want to say hello? Send me a message and I&apos;ll get back to you soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="Your name"
                  />
                  {errors.name ? <p className="mt-2 text-sm text-red-500">{errors.name}</p> : null}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                    placeholder="you@example.com"
                  />
                  {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email}</p> : null}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  placeholder="Tell me about your project..."
                />
                {errors.message ? <p className="mt-2 text-sm text-red-500">{errors.message}</p> : null}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="rounded-full bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-300 dark:disabled:bg-slate-700"
                >
                  Send message
                </button>
                {submitted ? (
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">
                    Thanks! Your message has been sent.
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer id="contact-footer" className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>© 2026 Eric Reeves. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit my GitHub profile"
              className="transition hover:text-slate-900"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit my LinkedIn profile"
              className="transition hover:text-slate-900"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Visit my Twitter profile"
              className="transition hover:text-slate-900"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
