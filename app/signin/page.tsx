import Header from '@/components/Header';
import { AuthSignInForm } from '@/components/auth/AuthSignInForm'

export default async function SignIn({
  searchParams,
}: {
  searchParams: { next: string }
}) {

  const redirect = searchParams.next ? searchParams.next : false;

  return (
    
    <>
      <Header />
      <main>
        <div className="container mx-auto px-5">
            <div className="flex justify-center items-center w-full min-h-screen">
              <div className="flex flex-col sm:max-w-md w-full justify-center gap-2">
                <AuthSignInForm redirectParam={redirect}/>
              </div>
            </div>
        </div>
      </main>
    </>
  )
};