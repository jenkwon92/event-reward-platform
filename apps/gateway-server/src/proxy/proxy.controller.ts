import { Controller, Get, Post, Body, Req, Res, All, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';

@Controller('api')
export class ProxyController {
  constructor(private readonly httpService: HttpService) {}

  @All(':service/*')
  async proxy(@Param('service') service: string, @Req() req: Request, @Res() res: Response) {
    const baseUrlMap = {
      auth: 'http://auth-server:3001',
      event: 'http://event-server:3002',
    };

    const targetBase = baseUrlMap[service];
    if (!targetBase) return res.status(404).send('Unknown service');

    const url = `${targetBase}${req.originalUrl.replace(`/api/${service}`, '')}`;
    const method = req.method.toLowerCase();
    const data = ['post', 'put', 'patch'].includes(method) ? req.body : undefined;

    try {
      const response = await lastValueFrom(
        this.httpService.request({ url, method, data, headers: req.headers }),
      );
      return res.status(response.status).send(response.data);
    } catch (err: any) {
      return res.status(err?.response?.status || 500).send(err?.response?.data || 'Proxy Error');
    }
  }
}
