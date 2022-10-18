import React from "react";
import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  console.log(providers)
  return (
    <div className="flex items-center bg-black min-h-screen w-full justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-[#18D860] text-white p-5 rounded-lg"
            onClick={() => signIn(provider.id, { callbackUrl: "/" } )}
          >
            Se connecter avec {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
