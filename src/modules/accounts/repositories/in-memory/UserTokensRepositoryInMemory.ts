import { UserToken } from "../../infra/typeorm/entities/UserToken";
import { ICreateRefreshTokenDTO } from "../../useCases/createRefreshToken/ICreateRefreshTokenDTO";
import { IUserTokensRepository } from "../IUserTokensRepository";


class UserTokensRepositoryInMemory implements IUserTokensRepository {
    private userTokens: UserToken[] = []

    async create({ user_id, expiration_date, refresh_token }: ICreateRefreshTokenDTO): Promise<UserToken> {
        const userToken = new UserToken()

        Object.assign(userToken, {
            user_id,
            refresh_token,
            expiration_date
        })

        this.userTokens.push(userToken)

        return userToken
    }

    async findByUserIdAndToken(user_id: string, token: string): Promise<UserToken> {
        const userToken = this.userTokens.find(ut => ut.user_id === user_id && ut.refresh_token === token)

        return userToken
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.userTokens.find(token => token.id === id)
        const index = this.userTokens.indexOf(userToken)

        this.userTokens.splice(index, 1)
    }
    
    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.userTokens.find(ut => ut.refresh_token === refresh_token)

        return userToken
    }
}

export {UserTokensRepositoryInMemory}