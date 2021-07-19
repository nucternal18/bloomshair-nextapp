import PropTypes from 'prop-types';
import Link from 'next/link';
import {  FaTimes } from 'react-icons/fa';
import styles from '../../../styles/Table.module.css';

import Button from '../Button';

const Table = ({ tableData, headingColumns }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.tableContainerTable}>
        <thead>
          <tr>
            {headingColumns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => {
            return (
              <tr key={row._id}>
                <td data-heading={'_id'}>{row._id}</td>
                <td data-heading={'price'}>{row.createdAt.substring(0, 10)}</td>
                <td data-heading={'brand'}>{row.totalPrice}</td>
                <td data-heading={'countInStock'}>
                  {row.isPaid ? (
                    row.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </td>
                <td data-heading={'countInStock'}>
                  {row.isDelivered ? (
                    row.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes className='text-red-500' />
                  )}
                </td>
                <td data-heading={'category'}>
                  <Button color='dark'>
                    <Link href={`/order/${order._id}`}>
                      <a>Details</a>
                    </Link>
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  breakOn: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Table;
