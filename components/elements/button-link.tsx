import type { Global } from '@/types/api'
import classNames from 'classnames'
import CustomLink from './custom-link'

interface IButtonLinkProps {
  button: Global['attributes']['navbar']['loginButton']
  appearance: string
  compact?: boolean
}

const ButtonContent = ({ button, appearance, compact }: IButtonLinkProps) => {
  return (
    <div
      className={classNames(
        // Common classes
        'block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md',
        // Full-size button
        {
          'px-8 py-4': compact === false,
        },
        // Compact button
        {
          'px-6 py-2': compact === true,
        },
        // Specific to when the button is fully dark
        {
          'bg-red text-white border-red-alert': appearance === 'dark',
        },
        // Specific to when the button is dark outlines
        {
          'text-primary-600 border-primary-600': appearance === 'dark-outline',
        },
        // Specific to when the button is fully white
        {
          'bg-white text-primary-600 border-white': appearance === 'white',
        },
        // Specific to when the button is white outlines
        {
          'text-white border-white': appearance === 'white-outline',
        }
      )}
    >
      {button.text}
    </div>
  )
}

const ButtonLink = ({
  button,
  appearance,
  compact = false,
}: IButtonLinkProps) => {
  return (
    <CustomLink link={button}>
      <ButtonContent
        button={button}
        appearance={appearance}
        compact={compact}
      />
    </CustomLink>
  )
}

export default ButtonLink
