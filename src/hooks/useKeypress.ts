import { useEffect, useState } from 'react'

export const useKeyPress = (targetKey: string) => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false)

    useEffect(() => {
        const downHandler = ({ key }: KeyboardEvent) => {
            if (key.toLocaleLowerCase() === targetKey) {
                setKeyPressed(true)
            }
        }

        const upHandler = ({ key }: KeyboardEvent) => {
            if (key.toLocaleLowerCase() === targetKey) {
                setKeyPressed(false)
            }
        }

        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    })

    return keyPressed
}
