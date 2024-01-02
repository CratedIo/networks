import Header from '@/components/Header';
import { AuthSignOutForm } from '@/components/auth/AuthSignOutForm';

export default async function SignOut({
  searchParams,
}: {
  searchParams: { next: string }
}) {

  const redirect = searchParams.next ? searchParams.next : false;

  return (
    <>
      <Header title={ '' } slug={ '/' } />
      <main>
        <div className="container mx-auto px-5">
            <div className="flex justify-center items-center w-full min-h-screen">
              <div className="flex flex-col sm:max-w-md w-full justify-center gap-2">
                <AuthSignOutForm redirectParam={redirect}/>
              </div>
            </div>
        </div>
      </main>
    </>
  )
};