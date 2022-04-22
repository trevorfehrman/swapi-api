import * as React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [data, setData] = React.useState<any>();

  React.useEffect(() => {
    async function init() {
      const response = await fetch('https://swapi.dev/api/people/1');
      const json = await response.json();
      setData(json);
    }

    init();
  }, []);

  return (
    <div>
      Hi my name is: {data?.name}
      <pre>{JSON.stringify(data)}</pre>
      <Homeworld homeworldUrl={data?.homeworld} />
    </div>
  );
};

function Homeworld({ homeworldUrl }: { homeworldUrl: string }) {
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    async function init() {
      const response = await fetch(homeworldUrl);
      const json = await response.json();
      setData(json);
    }

    init();
  }, [homeworldUrl]);

  return (
    <div>
      <div>And I live on: {data?.name}</div>
      {data?.residents &&
        data.residents.map((resident: any) => (
          <Resident residentUrl={resident} key={Math.random()} />
        ))}
    </div>
  );
}

function Resident({ residentUrl }: { residentUrl: string }) {
  const [data, setData] = React.useState<any>();
  React.useEffect(() => {
    async function init() {
      const response = await fetch(residentUrl);
      const json = await response.json();
      setData(json);
    }

    init();
  }, [residentUrl]);
  return (
    <div>
      <h1>{data?.name}</h1>
    </div>
  );
}

export default Home;
