import React from 'react';

const Pagination = ({ staffsPerPage, totalStaffs, paginate }) => {
    const pageNumbers = []; 

    for(let i = 1; i<= Math.ceil(totalStaffs / staffsPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className="mb-5">
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;