import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

type PokemonCardProps = {
  name: string
  url: string
}

type PokemonProps = {
  id: number
  name: string
  base_experience: number
  height: number
  order: number
  weight: number
  url: string
}

export function PokemonCard({ name, url }: PokemonCardProps) {
  const [pokemon, setPokemon] = useState({} as PokemonProps)

  useEffect(() => {
    async function getPokemonData() {
      const res = await axios.get(url)
      const data = res.data
      // console.log(data)
      const poke = {
        id: data.id,
        name: data.name,
        base_experience: data.base_experience,
        height: data.height,
        order: data.order,
        weight: data.weight,
        url: data.sprites.front_default,
      }
      setPokemon(poke)
    }
    getPokemonData()
  }, [url])

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="flex flex-col gap-4 px-6 py-4 w-48 items-center justify-center rounded-xl bg-purple-500 text-white font-bold">
          <div className="-mt-12">
            <Image src={pokemon.url} alt="" width={100} height={100} />
          </div>
          <div className="flex gap-4 rounded-lg px-4 py-1 bg-gray-600">
            <span className="text-purple-300">#{pokemon.id}</span>
            <h1>{name}</h1>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-white fixed" />
        <Dialog.Content className="bg-white rounded-md fixed top-1/2 left-1/2 tra">
          <Dialog.Title className="bg-red-500">Teste</Dialog.Title>
          <Dialog.Description />
          <Dialog.Close />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
