import React, { useState } from "react";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

const Table = ({ columns, data }) => {

    const [filterInput, setFilterInput] = useState("");

    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGroups, if your table has groupings
        // rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        // pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex }
     } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    },
        useFilters,
        useSortBy,
        usePagination
    );

    const handleFilterChange = e => {
        const value = e.target.value || undefined;
        setFilter("title", value);
        setFilterInput(value);
    };

      return (
        <div id="table">
            <div className="search-input">
                <input
                value={filterInput}
                onChange={handleFilterChange}
                placeholder={"Recherche par nom"}
                type="text" />
            </div>
            <table {...getTableProps()} className="custom-table">
            <thead className="table-header">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                        column.isSorted
                        ? column.isSortedDesc
                            ? "sort-desc"
                            : "sort-asc"
                        : ""
                    }
                    >
                    {column.render("Header")}
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => { // page instead of rows for pagination
                prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically

                // Each row can be rendered directly as a string using the react-table render method
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
            <div className="table-pagination">
                {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
                </button>{" "} */}
                <button onClick={() => previousPage()} disabled={!canPreviousPage} className="table-button">
                {"<"}
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage} className="table-button">
                {">"}
                </button>{" "}
                {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {">>"}
                </button>{" "} */}
                <span>
                Page{" "}{pageIndex + 1} of {pageOptions.length}{" "}
                </span>
                <span>
                | Aller à la page :{" "}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                    }}
                    style={{ width: "10rem" }}
                />
                </span>{" "}
            </div>
    </div>
  );
};
export default Table;