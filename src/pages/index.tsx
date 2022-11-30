import Image from 'next/image'
import { useEffect, useState } from 'react'
import Logo from '../assets/Logo.png'
import { PokemonCard } from '../components/Card'
import { api } from '../lib/axios'

type PokemonsProps = {
  name: string
  url: string
}

export default function Home() {
  const [urls, setUrls] = useState<PokemonsProps[]>([])
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')

  async function getPokemonsUrl() {
    const response = await api.get('pokemon')
    const results = response.data.results
    const nextPages = response.data.next
    const previousPages = response.data.previous
    setUrls(results)
    setNextPage(nextPages)
    setPreviousPage(previousPages)
  }

  async function NextPage() {
    const response = await api.get(`${nextPage}`)
    const results = response.data.results
    const nextPages = response.data.next
    const previousPages = response.data.previous
    setUrls(results)
    setNextPage(nextPages)
    setPreviousPage(previousPages)
  }

  async function PreviousPage() {
    const response = await api.get(`${previousPage}`)
    const results = response.data.results
    const nextPages = response.data.next
    const previousPages = response.data.previous
    setUrls(results)
    setNextPage(nextPages)
    setPreviousPage(previousPages)
  }

  useEffect(() => {
    getPokemonsUrl()
  }, [])

  return (
    <div className="flex flex-col gap-12 items-center max-w-2xl m-auto bg-white">
      <div>
        <Image src={Logo} alt="" />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-14">
        {urls.map((item) => {
          return <PokemonCard key={item.name} url={item.url} name={item.name} />
        })}
      </div>
      <div className="flex gap-4 mb-8">
        <button
          onClick={PreviousPage}
          className={`${previousPage === null ? `hidden` : `block`}
          bg-purple-500 text-white px-2 rounded uppercase`}
        >
          previous
        </button>
        <button
          onClick={NextPage}
          className={`${nextPage === null ? `hidden` : `block`}
          bg-purple-500 text-white px-2 rounded uppercase`}
        >
          next
        </button>
      </div>
    </div>
  )
}
