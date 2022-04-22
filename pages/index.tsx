import * as React from 'react';
import type { NextPage } from 'next';

export async function getStaticProps() {
  const lukeResponse = await fetch('https://swapi.dev/api/people/1');
  const luke = await lukeResponse.json();

  const homeworldResponse = await fetch(luke.homeworld);
  const tatooine = await homeworldResponse.json();

  const residentPromises = tatooine.residents.map((resident: string) => fetch(resident));
  console.log(residentPromises);

  const residentStreams = await Promise.all(residentPromises);
  console.log(residentStreams);

  const residentStreamPromises = residentStreams.map(stream => stream.json());
  const residents = await Promise.all(residentStreamPromises);
  console.log(residents);

  return {
    props: {
      luke,
      tatooine,
      residents,
    }, // will be passed to the page component as props
  };
}

interface SWAPIData {
  luke: {
    name: string;
    homeworld: string;
  };

  tatooine: {
    name: string;
    residents: string[];
  };
  residents: {
    name: string;
  }[];
}

const Home: NextPage<SWAPIData> = ({ luke, tatooine, residents }) => {
  return (
    <div>
      Hi my name is: {luke.name}
      <Homeworld tatooine={tatooine} residents={residents} />
    </div>
  );
};

function Homeworld({
  tatooine,
  residents,
}: {
  tatooine: { name: string };
  residents: { name: string }[];
}) {
  return (
    <div>
      <div>and i live on {tatooine?.name}</div>
      {residents ? residents.map(resident => <div key={Math.random()}>{resident.name}</div>) : ''}
    </div>
  );
}

export default Home;
