import Image from 'next/image'
import { api } from '../lib/axios'
import { useQuery } from 'react-query'
import Link from 'next/link'

type PokemonCardProps = {
  name: string
  url: string
}

type PokemonProps = {
  name: string
  id: number
  sprites: { front_default: string }
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  async function fetchPokemons(): Promise<PokemonProps> {
    const { data } = await api.get(url)
    return data
  }

  function usePokemons() {
    return useQuery(['pokemons', url], fetchPokemons)
  }
  const { data, isSuccess } = usePokemons()

  return (
    <div>
      {isSuccess && (
        <div className="flex flex-col gap-4 px-6 py-4 w-48 items-center justify-center rounded-xl bg-purple-500 text-white font-bold">
          <Link href={`pokemon/${data.id}`} prefetch={false} className="-mt-12">
            <Image
              src={data.sprites?.front_default}
              alt="pokemon image"
              width={100}
              height={100}
            />
          </Link>
          <div className="flex gap-2 w-full justify-between rounded-lg px-2 py-1 bg-gray-600">
            <span className="text-purple-300 flex-1">#{data.id}</span>
            <h1 className="overflow-hidden whitespace-nowrap overflow-ellipsis">
              {name}
            </h1>
          </div>
        </div>
      )}
    </div>
  )
}
