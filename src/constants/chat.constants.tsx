import { ChatListInterface, ChatMessageInterface } from "./interfaces/chat.interface";

export const CHAT_LIST: ChatListInterface[] = [
    {
        name: 'qasim',
        bookmarked: false,
        username: 'Paul Mets',
        lastMessage: "Cursus Condimentum tempus",
        unreadCount: 0,
        lastMessageTime: '10:24pm',
        _id: "234"
    }
]

export const CHAT_MESSAGE:ChatMessageInterface[] = [
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        message: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: false,
        _id: "",
        type: 'questioniar'
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        message: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: true,
        _id: "",
        type: 'questioniar'
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        message: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: false,
        _id: "",
        type: 'questioniar'
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        message: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: true,
        myMessage: true,
        _id: "",
        type: 'questioniar'
    },
    {
        username: 'Kristo Vunukainen',
        time: '10:25 AM',
        companyName: 'Electrician',
        message: "Curabitur blandit tempus porttitor. Maecenas sed diam eget risus varius blandit sit amet non magna. ",
        seen: false,
        myMessage: false,
        files: [],
        _id: "",
        type: 'questioniar'
    }
]