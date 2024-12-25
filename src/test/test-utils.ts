import React from 'react'
import { render } from '@testing-library/react'
import AllTheProviders from './all-providers'

type CustomRenderOptions = Omit<Parameters<typeof render>[1], 'wrapper'>

const customRender = (ui: React.ReactElement, options?: CustomRenderOptions) =>
	render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }