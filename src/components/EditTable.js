import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

const EditTable = props => {
  const { data, editRow, deleteRow } = props;
  return (
    <table>
      <thead>
        <tr>
          <td>
            <Button text="New" />
          </td>
          {Object.keys(data.table.nodes[0])
            .filter(item => item !== '__typename')
            .map(item => (
              <td key={item}>{item}</td>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.table.nodes.map(item => (
          <tr>
            <td>
              <Button onClick={editRow} text="Edit" />
              <Button onClick={deleteRow} text="Delete" />
            </td>
            {Object.values(item).map(item2 => (
              <td>{item2}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

EditTable.propTypes = {
  /* data: PropTypes.instanceOf(Object).isRequired, */
  editRow: PropTypes.func.isRequired,
  deleteRow: PropTypes.func.isRequired,
};

export default EditTable;
