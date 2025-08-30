import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useSchedule = () => {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        setLoading(true)

        const { data, error } = await supabase
          .from('schedule')
          .select('*')
          .order('id', { ascending: true })

        if (error) {
          throw error
        }

        setSchedule(data || [])
        setError(null)
      } catch (err) {
        //eslint-disable-next-line no-console
        console.error('Error fetching schedule:', err.message)
        setError(err.message)
        setSchedule([])
      } finally {
        setLoading(false)
      }
    }

    fetchSchedule()

    const subscription = supabase
      .channel('schedule-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'schedule',
        },
        () => {
          fetchSchedule()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return { schedule, loading, error }
}
