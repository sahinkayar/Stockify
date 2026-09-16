interface Props {
  config: any;
  data: any;
}
function Table({ config, data }: Props) {
  const renderedHeaders = config.map((config: any) => {
    return (
      <th
        className="px-1 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.date}>
        {config.map((config: any) => {
          return (
            <td
              className="px-1 py-1 whitespace-nowrap text-sm font-normal text-gray-900 text-center"
              key={config.label}
            >
              {config.render(company)}
            </td>
          );
        })}
      </tr>
    );
  });

  return (
    <div className="w-full bg-white shadow-lg rounded-xl p-4 sm:p-6 overflow-x-auto mt-4">
      <table className="w-full min-w-full divide-y divide-gray-200 align-middle">
        <thead className="bg-gray-50">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {renderedRows}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
