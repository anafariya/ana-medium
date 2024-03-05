import { Auth } from "../components/Auth";

const Signin = () => {
  return (
    <div className="bg-gray-200 h-[100vh] flex justify-center overflow-hidden items-center">
      <div className="container mx-auto flex flex-col md:flex-row">
        <Auth type="signin"/>
        <div className="bg-gray-400 h-[80vh] mt-10 ml-40 hidden md:block p-12 md:p-20 flex-col justify-center rounded-lg shadow-lg">
          <p className="italic text-lg md:text-xl mb-8">
            "Instead of wondering when your next vacation is,<br/> maybe you should set up a life you don't need to escape from."
          </p>
          <h3 className="text-xl md:text-2xl font-bold mb-2">Seth Godin</h3>
          <h4 className="text-lg md:text-xl font-semibold">Entrepreneur, Author, and Speaker</h4>
        </div>
      </div>
    </div>
  );
};

export default Signin;
