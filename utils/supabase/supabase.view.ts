'use server'
import { createClientServer } from '@/utils/supabase/supabase.server'
import { cookies } from 'next/headers'


export async function setArticleView (article_id:string, user_id:string) {

    const cookieStore = cookies()
    const supabase = createClientServer(cookieStore)

    const { data, error } = await supabase
    .from("creative_view")
    .insert({
        article_id: article_id,
        user_id: user_id
    })
}
