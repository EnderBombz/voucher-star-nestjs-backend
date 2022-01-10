import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { createCanvas, loadImage } from 'canvas';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BadgeService {
  constructor(
    private userService: UserService,
    private httpService: HttpService,
  ) {}

  async checkUser(id) {
    try {
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const user = await this.userService.findOneById(id);
        console.log(user);
        if (user.length > 0) {
          return {
            check: true,
            data: user,
          };
        } else {
          return {
            check: false,
            message: 'User not found',
          };
        }
      }
    } catch (err) {
      throw err;
    }
  }

  async sendVouchersById(body) {
    try {
      const { list, voucher } = body;

      if (!list || !voucher) {
        return {
          error:
            'You must inform the recipient list, to send the voucher data and what is the gift that will be delivered to the colaborators.',
          status: 404,
          method: 'POST',
        };
      }

      const jsonList = JSON.parse(list);

      if (jsonList != undefined) {
        jsonList.forEach((element) => {
          console.log(element.vouchers);
          const voucherList = element.vouchers;

          voucherList.push(voucher);
          console.log(voucherList);

          this.userService.updateById(
            { _id: element._id },
            {
              $set: {
                vouchers: voucherList,
              },
            },
          );
        });
        return { message: 'success', status: 201, method: 'PUT' };
      }
    } catch (err) {
      console.log(err);
    }
  }

  /*
  inserir no diagrama de classe
  */

  async sendVouchersByRegistration(body) {
    try {
      const { list, voucher } = body;

      if (!list || !voucher) {
        return {
          error:
            'You must inform the recipient list, to send the voucher data and what is the gift that will be delivered to the colaborators.',
          status: 404,
          method: 'POST',
        };
      }

      const jsonList = JSON.parse(list);

      if (jsonList != undefined) {
        jsonList.forEach((element) => {
          console.log(element.vouchers);
          const voucherList = element.vouchers;

          voucherList.push(voucher);
          console.log(voucherList);

          this.userService.updateById(
            { registration: element.registration },
            {
              $set: {
                vouchers: voucherList,
              },
            },
          );
        });
        return { message: 'success', status: 201, method: 'PUT' };
      }
    } catch (err) {
      console.log(err);
    }
  }
  async generateBadge(body) {
    const { QRCode, name } = body;

    //`https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=${QRCode}`,

    const OBJcard = {
      name: name,
      qr: QRCode,
    };
    const applyText = (canvas, text) => {
      const context = canvas.getContext('2d');

      let fontSize = 70;
      do {
        context.font = `${(fontSize -= 5)}px sans-serif`;
      } while (context.measureText(text).width + 70 > canvas.width);
      return context.font;
    };

    const heinekenLogo = await loadImage('https://i.imgur.com/VV8rQ10.png');
    const QRCodeImg = await loadImage(OBJcard.qr);

    const width = 600;
    const height = 950;

    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#fff';
    context.fill();

    context.strokeStyle = '#000';

    // Draw a rectangle with the dimensions of the entire canvas
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#000';
    context.font = applyText(canvas, OBJcard.name);
    context.fillStyle = '#000';
    context.fillText(OBJcard.name.toUpperCase(), 60, height / 2 + 300);

    context.drawImage(heinekenLogo, 60, height / 2 + 350, width - 150, 110);
    context.save();

    context.drawImage(
      QRCodeImg,
      canvas.width / 2 - 275,
      height / 2 - 365,
      550,
      550,
    );

    const centerX = canvas.width / 2;
    const centerY = 70;
    const radius = 25;

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'black';
    context.fill();
    context.lineWidth = 5;
    context.stroke();
    context.closePath();

    context.save();

    const image = await canvas.toDataURL('image/png');

    return image;
  }
  async updateVouchersById(body) {
    try {
      const { list, voucher } = body;
      const jsonList = JSON.parse(list);

      if (jsonList != undefined) {
        jsonList.forEach((element) => {
          console.log(element.vouchers);
          const voucherList = element.vouchers;

          voucherList.push(voucher);
          console.log(voucherList);

          this.userService.updateVouchersById(element._id, voucherList);

          return { message: 'success', status: 201, method: 'PUT' };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateVouchersByName(body) {
    try {
      const { list, voucher } = body;
      const jsonList = JSON.parse(list);

      if (jsonList != undefined) {
        jsonList.forEach((element) => {
          console.log(element.vouchers);
          const voucherList = element.vouchers;

          voucherList.push(voucher);
          console.log(voucherList);

          this.userService.updateVouchersByName(element.userName, voucherList);

          return { message: 'success', status: 201, method: 'PUT' };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async updateVouchersByRegistration(body) {
    try {
      const { list, voucher } = body;
      const jsonList = JSON.parse(list);

      if (jsonList != undefined) {
        jsonList.forEach((element) => {
          console.log(element.vouchers);
          const voucherList = element.vouchers;

          voucherList.push(voucher);
          console.log(voucherList);

          this.userService.updateVouchersByRegistration(
            element.registration,
            voucherList,
          );

          return { message: 'success', status: 201, method: 'PUT' };
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
