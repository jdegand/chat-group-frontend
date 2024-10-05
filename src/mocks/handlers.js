import { rest } from 'msw'

export const handlers = [

    rest.post('http://localhost:3500/auth', (req, res, ctx) => {
        return res(
            ctx.cookie('jwt', 'abc-123'),
        )
    }),

    rest.get('http://localhost:3500/channels', (req, res, ctx) => {
        return res(
            ctx.json({
                data: [
                    {
                        "_id": "679ii9858f9332ba8",
                        "name": "Socket",
                        "description": "Needs Socket Server",
                        "members": [
                            "62dwejjea71dabn2e4afe872",
                            "62dafaaea67dabn2e4afe999",
                            "62d5b3403f1c9a9d382e145f",
                            "62dafaaea67dabn2e4afe872"
                        ],
                        "messages": [
                            "62dc37ca3b438e58f9335ghm"
                        ],
                        "createdAt": "2022-07-23T18:01:59.990Z",
                        "updatedAt": "2022-08-24T19:15:52.978Z",
                        "__v": 4
                    },
                ]
            })
        )
    }),
]