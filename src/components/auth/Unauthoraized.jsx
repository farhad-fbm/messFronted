const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-[85vh] bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-500">Unauthorized</h1>
        <p className="text-gray-700">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
