import { observer } from "mobx-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Gateway = observer(() => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/posts')
    }, [])

    return null
})