import Link from "next/link"

const AuthHeader = () => {
  return (
    <header className="flex items-center gap-20 p-5 justify-between border-b-4 border-sushi">
      <div className="flex flex-col">
        <Link href="/" className="button hover:scale-110 duration-75">
          <h1 className="text-2xl">Tournament</h1>
          <h2 className="text-xl">Generator</h2>
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader