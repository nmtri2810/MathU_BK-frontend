import {} from '@material-tailwind/react'

type ErrorProps = {
  children?: unknown
  onPointerEnterCapture?: unknown
  onPointerLeaveCapture?: unknown
  placeholder?: unknown
  crossOrigin?: unknown
}

declare module '@material-tailwind/react' {
  export interface CardProps extends ErrorProps {}
  export interface CardHeaderProps extends ErrorProps {}
  export interface TypographyProps extends ErrorProps {}
  export interface CardBodyProps extends ErrorProps {}
  export interface InputProps extends ErrorProps {}
  export interface CheckboxProps extends ErrorProps {}
  export interface CardFooterProps extends ErrorProps {}
  export interface ButtonProps extends ErrorProps {}
}
