import PageHeader from '@/components/common/PageHeader';
import Image from 'next/image';
import { TeamRegistrationForm } from '@/components/forms/TeamRegistrationForm';

const signup = () => {
  return (
    <main>
      <PageHeader
        className="min-h-[150px]! lg:min-h-[180px]!"
        title="Register"
        titleOnly
        image="/assets/images/registerbg.png"
      />
      <div className="layout-padding container mx-auto grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="">
          <TeamRegistrationForm />
        </div>
        <div className="order-first lg:order-last">
          <Image
            src={'/assets/images/registerbanner.png'}
            width={1000}
            height={1000}
            className="rounded-[2px]"
            alt="Register Banner"
          />
          <div className="mt-6 space-y-3">
            <h4 className="text-xl font-semibold underline">
              Team Registration{' '}
            </h4>
            <p className="text-justify text-sm">
              Creating a tournament team requires careful consideration of
              individual skills, teamwork, and strategy. It starts by
              identifying talented individuals who complement each other's
              strengths and weaknesses. Effective communication and
              collaboration are essential to build synergy within the team. A
              clear game plan and roles for each member are crucial for success.
              Lastly, continuous practice and adaptation are key to refining the
              team's performance and maximizing their chances of winning the
              tournament.
            </p>
            <ul className="list-inside list-disc text-sm">
              <li>
                Identify skilled and committed players through tryouts or
                invitations.
              </li>
              <li>
                Balance roles, communication, and synergy among team members for
                a competitive edge.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default signup;
