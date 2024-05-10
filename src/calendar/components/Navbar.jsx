export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 px-4">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <i className="fa fa-calendar-alt"></i>
                    &nbsp;
                    Fernando
                </span>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto ">

                    </ul>
                    <button className="btn btn-outline-danger form-inline">
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Salir</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}
