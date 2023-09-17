import React, { useState } from 'react'
import { Input, Button, HStack, VStack, Checkbox, Text, Heading, Image } from '@chakra-ui/react'

import type { User } from '@wasp/entities'
import { Task } from '@wasp/entities'
import { tasksCrud } from '@wasp/crud/tasksCrud'

import shiftDuckUrl from './images/shiftDuck.svg'

const MainPage = ({ user }: { user: User }) => {
  console.log(user)

  const { data: tasks } = tasksCrud.getAll.useQuery()
  const createTask = tasksCrud.create.useAction()

  const handleNewTask = async (newTask: Task) => {
    await createTask(newTask)
  };

  return (
    <VStack mt={10} mx='auto' spacing={10} justify='center' align='center' w='400px'>
      <HStack>
        <Image boxSize='125px' src={shiftDuckUrl} />
        <Heading>To Do's</Heading>
      </HStack>

      <NewTaskForm createTask={handleNewTask} />

      {tasks && (
        <VStack gap={3} w={'full'}>
          {tasks.map((task) => <Todo {...task} key={task.id} />)}
        </VStack>
      )}

    </VStack>
  )
}
export default MainPage

function Todo({ id, isDone, description }: Task) {

  const updateTask = tasksCrud.update.useAction();
  const deleteTask = tasksCrud.delete.useAction();

  return (
    <HStack
      alignItems={'center'}
      justify='space-between'
      bgColor='purple.50'
      borderRadius='lg'
      border='1px solid rgba(0, 0, 0, 0.11)'
      p={2}
      w='full'
    >
      <HStack>
        <Checkbox
          defaultChecked={!!isDone}
          onChange={async (e) => await updateTask({ id, isDone: e.currentTarget.checked })}
        />
        <Text ml={2} {...(isDone && { as: 's' })}>
          {description}
        </Text>
      </HStack>
      {isDone && (
        <Button size={'xs'} variant='unstyled' onClick={async () => await deleteTask({ id })}>
          ❌
        </Button>
      )}

    </HStack>
  )
}

function NewTaskForm({ createTask }: { createTask: any }) {
  const [description, setDescription] = useState('')

  const handleSubmit = async () => {
    try {
      // TODO(matija): add some spinner to the button
      await createTask({ description })
      setDescription('')

    } catch (err: any) {
      window.alert('Error: ' + err?.message)
    }
  }

  return (
    <HStack gap={1} w='full'>
      <Input
        id='description'
        //autoComplete='description'
        fontSize={'sm'}
        textColor={'gray.600'}
        mr={2}
        w={'full'}
        borderRadius={'0.5rem'}
        border={'1px solid rgba(0, 0, 0, 0.1)'}
        bg='#f5f0ff !important'
        boxShadow={'md'}
        _focus={{
          boxShadow: 'none !important',
          borderColor: 'transparent',
        }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button boxShadow={'md'} onClick={handleSubmit} minWidth={'7rem'} >
        {'Add Task'}
      </Button>
    </HStack>
  )
}