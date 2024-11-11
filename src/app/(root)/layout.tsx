
import { auth } from '@clerk/nextjs/server';
import { Prisma, PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import { use } from 'react';
const prisma = new PrismaClient()
export default async function SetupLayout({
    children
}: {
    children: React.ReactNode;
}) {

    const { userId } = await auth();
    if (!userId) {
        redirect('/sign-up')
    }
    const user = await prisma.user.findFirst({
        where: {
            userId
        }
    })
    if (!user)

        redirect(`/role/${userId}`)

    if (user && user.role === "ADMIN")

        redirect(`/dashboard/${userId}`)

    if (user && user.role === "USER")
        redirect(`/user/${userId}`)
    return (
        <>
            {children}
        </>
    )
}
