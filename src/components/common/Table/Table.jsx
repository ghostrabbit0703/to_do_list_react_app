function Table({ columns, data }) {

    return (
        <div className="table-responsive">

            <table className="table table-striped table-hover align-middle">

                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>

                    {data.map((row) => (
                        <tr key={row.id}>

                            {columns.map((column) => (

                                <td key={column.key}>

                                    {column.render ? (

                                        column.render(row)

                                    ) : (

                                        <div
                                            className="text-truncate"
                                            style={{
                                                maxWidth: '250px'
                                            }}
                                            title={row[column.key]}
                                        >
                                            {row[column.key]}
                                        </div>

                                    )}

                                </td>

                            ))}

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Table;