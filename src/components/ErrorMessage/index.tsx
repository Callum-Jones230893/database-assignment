const ErrorMessage = ({error}: {error: string}) => {
  return (
    <div className="text-red-500 text-center">
      {error}
    </div>
  )
}

export default ErrorMessage