import Image from 'next/image'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Logo from '../assets/Logo.png'
import { PokemonCard } from '../components/Card'
import { api } from '../lib/axios'

type urlProps = {
  next: string | null
  previous: string | null
  pokemons: {
    name: string
    url: string
  }[]
}

export default function Home() {
  const [nextPage, setNextPage] = useState('')
  const [previousPage, setPreviousPage] = useState('')

  const { data: fetchUrls } = useQuery<urlProps>('urls', async () => {
    const { data } = await api.get('pokemon')
    const urlData: urlProps = {
      next: data.next,
      previous: data.previous,
      pokemons: data.results,
    }

    return urlData
  })

  async function NextPage() {
    const response = await api.get(`${nextPage}`)
    const nextPages = response.data.next
    const previousPages = response.data.previous
    setNextPage(nextPages)
    setPreviousPage(previousPages)
  }

  async function PreviousPage() {
    const response = await api.get(`${previousPage}`)
    const nextPages = response.data.next
    const previousPages = response.data.previous
    setNextPage(nextPages)
    setPreviousPage(previousPages)
  }

  return (
    <div className="flex flex-col gap-12 items-center max-w-2xl m-auto bg-white">
      <div>
        <Image src={Logo} alt="" />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-14">
        {fetchUrls?.pokemons.map((props) => {
          return (
            <PokemonCard key={props.name} name={props.name} url={props.url} />
          )
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
