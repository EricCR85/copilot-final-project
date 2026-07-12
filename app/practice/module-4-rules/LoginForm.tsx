'use client'

import { useState, type ChangeEvent, type FC, type FormEvent } from 'react'

type LoginFormValues = {
  email: string
  password: string
}

type FormErrors = Partial<Record<keyof LoginFormValues, string>>

interface LoginFormProps {}

const validate = (values: LoginFormValues): FormErrors => {
  const nextErrors: FormErrors = {}

  if (!values.email.trim()) {
    nextErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    nextErrors.email = 'Enter a valid email'
  }

  if (!values.password.trim()) {
    nextErrors.password = 'Password is required'
  } else if (values.password.length < 6) {
    nextErrors.password = 'Password must be at least 6 characters'
  }

  return nextErrors
}

export const LoginForm: FC<LoginFormProps> = (): JSX.Element => {
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleChange = (
    field: keyof LoginFormValues,
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const nextValues: LoginFormValues = {
      ...values,
      [field]: event.target.value,
    }

    setValues(nextValues)

    if (errors[field]) {
      setErrors(validate(nextValues))
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const nextErrors: FormErrors = validate(values)
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Sign in</h2>
        <p className="mt-1 text-sm text-gray-600">Use your account details to continue.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={values.email}
            onChange={event => handleChange('email', event)}
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="you@example.com"
          />
          {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={values.password}
            onChange={event => handleChange('password', event)}
            aria-invalid={Boolean(errors.password)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter your password"
          />
          {errors.password ? <p className="mt-1 text-sm text-red-600">{errors.password}</p> : null}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Sign in
        </button>
      </div>

      {submitted ? <p className="mt-4 text-sm text-green-600">Looks good</p> : null}
    </form>
  )
}
