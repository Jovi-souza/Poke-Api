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
  const [currentyPage, setCurrentyPage] = useState(0)

  const { data: fetchUrls } = useQuery<urlProps>(
    ['urls', currentyPage],
    async () => {
      const { data } = await api.get(`pokemon/?limit=20&offset=${currentyPage}`)
      const results = {
        next: data.next,
        previous: data.previous,
        pokemons: data.results,
      }
      return results
    },
  )

  async function NextPage() {
    setCurrentyPage((state) => (state += 20))
  }

  async function PreviousPage() {
    setCurrentyPage((state) => (state -= 20))
  }

  return (
    <div className="flex flex-col gap-12 items-center max-w-2xl m-auto bg-white">
      <div>
        <Image src={Logo} alt="" priority={true} />
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
          className={`${
            fetchUrls?.previous === null ? 'hidden' : 'block'
          } bg-purple-500 text-white px-2 rounded uppercase`}
        >
          previous
        </button>
        <button
          onClick={NextPage}
          className={`${
            fetchUrls?.next === null ? 'hidden' : 'block'
          } bg-purple-500 text-white px-2 rounded uppercase`}
        >
          next
        </button>
      </div>
    </div>
  )
}
