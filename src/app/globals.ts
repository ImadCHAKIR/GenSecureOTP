import { Injectable } from '@angular/core';

@Injectable()

export class Globals{
    starting: boolean = true
    user = {}
    codeOtp: string = ''

    setStarting(){
        this.starting = false
    }

    setUser(user){
        this.user = user
    }

    setCodeOtp(codeOtp){
        this.codeOtp = codeOtp
    }
}