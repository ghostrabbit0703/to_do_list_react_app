function Pagination({
    currentPage,
    lastPage,
    onPageChange
}) {

    if (lastPage <= 1) {
        return null;
    }

    const pages = [];

    for (let page = 1; page <= lastPage; page++) {
        pages.push(page);
    }

    return (
        <nav aria-label="Paginación">

            <ul className="pagination justify-content-center mt-4">

                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>

                    <button
                        type="button"
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </button>

                </li>

                {pages.map((page) => (

                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >

                        <button
                            type="button"
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>

                    </li>

                ))}

                <li className={`page-item ${currentPage === lastPage ? 'disabled' : ''}`}>

                    <button
                        type="button"
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === lastPage}
                    >
                        Siguiente
                    </button>

                </li>

            </ul>

        </nav>
    );
}

export default Pagination;