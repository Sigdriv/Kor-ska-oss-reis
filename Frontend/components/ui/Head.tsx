interface Props {
  page: string;
}

export function Head({ page }: Props) {
  return (
    <head>
      <title>Kor ska oss reis | {page}</title>
      <meta name="description" content={`Kor ska oss reis | ${page}`} />
    </head>
  );
}
