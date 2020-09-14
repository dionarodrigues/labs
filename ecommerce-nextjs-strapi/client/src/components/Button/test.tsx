import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import { AddShoppingCart } from '@styled-icons/material-outlined/AddShoppingCart'

import Button from '.'

describe('<Button />', () => {
  it('should render a medium button by default', () => {
    const { container } = renderWithTheme(<Button>By Now</Button>)
    expect(screen.getByRole('button', { name: /By Now/i })).toHaveStyle({
      height: '4rem',
      padding: '0.8rem 3.2rem',
      'font-size': '1.4rem'
    })

    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render a small button', () => {
    renderWithTheme(<Button size="small">By Now</Button>)
    expect(screen.getByRole('button', { name: /By Now/i })).toHaveStyle({
      height: '3rem',
      'font-size': '1.2rem'
    })
  })

  it('should render a large button', () => {
    renderWithTheme(<Button size="large">By Now</Button>)
    expect(screen.getByRole('button', { name: /By Now/i })).toHaveStyle({
      height: '5rem',
      padding: '0.8rem 4.8rem',
      'font-size': '1.6rem'
    })
  })

  it('should render a full width button', () => {
    renderWithTheme(<Button fullWidth>By Now</Button>)
    expect(screen.getByRole('button', { name: /By Now/i })).toHaveStyle({
      width: '100%'
    })
  })

  it('should render a button with icon', () => {
    renderWithTheme(
      <Button icon={<AddShoppingCart data-testid="icon" />}>By Now</Button>
    )
    expect(screen.getByText(/By Now/i)).toBeInTheDocument()
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })
})
