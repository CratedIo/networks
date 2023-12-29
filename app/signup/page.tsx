import { AuthSignUpForm } from '@/components/auth/AuthSignUpForm'

export default async function SignIn({
  searchParams,
}: {
  searchParams: { next: string }
}) {

  const redirect = searchParams.next ? searchParams.next : null;
  
  return (
    <main>
      <div className="container mx-auto px-5">
          <div className="flex justify-center items-center w-full min-h-screen">
            <div className="flex flex-col sm:max-w-md w-full justify-center gap-2">
              <AuthSignUpForm redirectParam={redirect}/>
            </div>
          </div>
      </div>
    </main>
  )
};