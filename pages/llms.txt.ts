import { GetServerSideProps } from 'next'

const NAME = 'hovanhoa'
const FULL_NAME = 'Hồ Văn Hòa'
const BASE_URL = 'https://hovanhoa.net'
const STATUS_URL = 'https://status.hovanhoa.net'
const INSIGHT_URL = 'https://insight.hovanhoa.net'
const GALLERY_URL = 'https://gallery.hovanhoa.net'
const INFO_URL = 'https://info.hovanhoa.net'
const TWITTER = '_hovanhoa_'
const LINKEDIN = 'hovanhoa'
const GITHUB = 'hovanhoa'
const ROLE = 'Software Engineer'

function generateLlms() {
    return `# About ${FULL_NAME}

## Basic Information
- Name: ${FULL_NAME}
- Username: ${NAME}
- Role: ${ROLE}
- Website: ${BASE_URL}

## Professional Profile
Hey there! 👋 I'm Hòa.

Software Engineer with 3+ years of experience. I am confident in my knowledge of software development concepts, industry best practices, and modern software technologies.

## Tech Stack
- Golang (https://go.dev/)
- Python (https://www.python.org/)
- PostgreSQL (https://www.postgresql.org/)
- MongoDB (https://www.mongodb.com/)
- AWS (https://aws.amazon.com/)
- GCP (https://cloud.google.com/)

## Social Links
- Twitter: https://twitter.com/${TWITTER}
- GitHub: https://github.com/${GITHUB}
- LinkedIn: https://linkedin.com/in/${LINKEDIN}

## Additional Resources
- Insight: ${INSIGHT_URL}
- Gallery: ${GALLERY_URL}
- Status: ${STATUS_URL}
- Info: ${INFO_URL}

## Contact
Check out ${INFO_URL} to connect with me!
Monitor my services at ${STATUS_URL}.
`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const llmsContent = generateLlms()

    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.write(llmsContent)
    res.end()

    return {
        props: {},
    }
}

export default function Llms() {
    return null
}
