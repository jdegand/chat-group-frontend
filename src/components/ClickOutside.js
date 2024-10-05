import { useRef, useEffect } from "react";

function ClickOutside(props) {
    const ref = useRef()

    const { onClickOutside, children } = props;

    const handleClickOutside = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            onClickOutside && onClickOutside()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);

        return () => document.removeEventListener('click', handleClickOutside, true);
    })

    if (!children) {
        return null;
    }

    return (
        <div ref={ref}>{children}</div>
    )

}

export default ClickOutside;