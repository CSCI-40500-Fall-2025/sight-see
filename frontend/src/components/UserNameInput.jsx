export default function UserNameInput({value, onChange, onBlur, error}) {
    const hint = error || "Must be 3 to 30 characters. Can contain letters, numbers or dash";
    return (
        <div className="mb-2">
            <label className="input validator w-full">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </g>
                </svg>
            <input
                type = "text"
                required
                placeholder = "Username"
                value = {value}
                onChange = {(e) => onChange?.(e.target.value)}
                onBlur = {onBlur}
                pattern ="[A-Za-z][A-Za-z0-9\-]*"
                minlength = {3}
                maxlength = {30}
                title = "Only letters, numbers or dash. Must start with a letter"
                aria-invalid = {!!error}
                aria-describedby = "username-hint"
            />
            </label>
            <p id = "username-hint" className = {`validator-hint ${error ? "" : "hidden"}`}>{hint}</p>
        </div>
    );
}