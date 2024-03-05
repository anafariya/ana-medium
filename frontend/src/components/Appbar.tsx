import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const Appbar = () => {
  return (
    <div className="border-b py-4 flex justify-between px-10">
      <Link to={'/blogs'}>
      <div className="flex font-medium flex-col justify-center">
        Medium
      </div>
      </Link>
      <div>
        <Avatar
        name="Ana"
        />
      </div>
    </div>
  )
}

export default Appbar
