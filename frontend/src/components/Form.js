function Form(props) {
    return (
        <form className="form" name={props.name} noValidate onSubmit={props.onSubmit}>
            <h2 className={props.titleClass}>{props.title}</h2>
            {props.children}
            <button disabled={props.btnStatus} className={props.btnClass} type="submit" aria-label="Сохранить">{props.btn}</button>
        </form>
    );
}

export default Form;