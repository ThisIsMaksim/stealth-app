import { useLayoutEffect } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
    href: string
}

export const RedirectPage = ({href}: Props) => {
    const navigate = useNavigate()

    useLayoutEffect(() => {
        navigate(href)
    }, [])

    return null
}