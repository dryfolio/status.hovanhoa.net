import { GetServerSideProps } from 'next'

const STATUS_URL = 'https://status.hovanhoa.net'

function generateRobots() {
  return `User-agent: *
Allow: /
Sitemap: ${STATUS_URL}/sitemap.xml
Host: ${STATUS_URL}
`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const robots = generateRobots()

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return {
    props: {},
  }
}

export default function Robots() {
  return null
}
