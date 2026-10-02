export default function ClientNavbar() {
    return (
        <header className="client-navbar">
            <div className="client-search">
                <span>⌕</span>
                <input
                    type="text"
                    placeholder="Search projects..."
                />
            </div>

            <div className="client-navbar-actions">
                <button className="client-icon-button">
                    ?
                </button>

                <button className="client-icon-button">
                    ♡
                </button>

                <div className="client-navbar-avatar">
                    C
                </div>
            </div>
        </header>
    );
}